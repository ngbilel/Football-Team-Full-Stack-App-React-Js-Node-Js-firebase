import React, {Component} from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/formFields';
import {validate} from '../../ui/misc';
import {firebasePlayers, firebaseDB,firebase} from '../../../firebase';
import FileUploader from '../../ui/fileUploader';


class AddEditPlayers extends Component {

state = {
    playerId:'',
    formType:'',
    formError:'',
    formSuccess:'',
    defaultImg:'',
    formData:{
        name: {
            element:'input',
            value:'',
            config:{
                label:'Player Name',
                name:'name_input',
                type:'text'
            },validation:{
                required: true,
            },
            valid: false,
            validationMessage:'',
            showLabel:true
        },
        lastName: {
            element:'input',
            value:'',
            config:{
                label:'Player Last Name',
                name:'lastName_input',
                type:'text'
            },validation:{
                required: true,
            },
            valid: false,
            validationMessage:'',
            showLabel:true
        },
        number: {
            element:'input',
            value:'',
            config:{
                label:'Player Number',
                name:'number_input',
                type:'text'
            },validation:{
                required: true,
            },
            valid: false,
            validationMessage:'',
            showLabel:true
        },
        position: {
            element:'select',
            value:'',
            config:{
                label:'Select a position',
                name:'select_input',
                type:'select',
                options:[
                    {key:"Keeper",value:"Keeper"},
                    {key:"Defence",value:"Defence"},
                    {key:"Midfiled",value:"Midfiled"},
                    {key:"keeper",value:"keeper"}
                ]
            },validation:{
                required: true,
            },
            valid: false,
            validationMessage:'',
            showLabel:true
        },
        image:{
            element:'image',
            value:'',
            validation:{
                required: true
            },
            valid:false
        }
        
    }
}

updateFields = (player , playerId , formType , defaultImg) => {

    const newFormData = { ...this.state.formData}

    for(let key in newFormData){
        newFormData[key].value = player[key];
        newFormData[key].valid =  true
    }

    this.setState({
        playerId,
        defaultImg,
        formType,
        formData :  newFormData
    })
}

componentDidMount(){

    const playerId=this.props.match.params.id;

    if(!playerId){ //Add Player

            this.setState({ formType:'Add Player'})

    }else{  //Edit Player
        firebaseDB.ref(`players/${playerId}`).once('value')
        .then( snapshot =>{
            const playerData=snapshot.val();
            //find Image player
            firebase.storage().ref('players')
            .child(playerData.image).getDownloadURL()
            .then(url => {
                //Function to update fields
                this.updateFields(playerData, playerId, 'Edit player', url) 
            }).catch(e => {
                this.updateFields({...playerData, image:''}, playerId, 'Edit player', '') 
            })

        })
    }
}

updateForm = (element, content='') => { // content for fileUploader

    console.log(element);

    const newFormData= { ...this.state.formData} 
    const newElement = {...newFormData[element.id]}

    if(content ===''){
        newElement.value = element.event.target.value;
        
    } else {
        newElement.value = content; // Name of the image
    }

     
    //Validation
     let validData = validate(newElement);
     newElement.valid=validData[0];
     newElement.validationMessage = validData[1];
    
    newFormData[element.id]=newElement;
    
    this.setState({
        formError:false,
        formData: newFormData
    })

}

successForm = (message) => {
    this.setState({
        formSuccess: message
    });
    setTimeout(()=>{
        this.setState({
            formSuccess: ''
        });
    },2000)
}


submitForm(event){
    event.preventDefault();

    let dataToSubmit ={};
    let formIsValid= true;

    for (let key in this.state.formData){
        dataToSubmit[key]=this.state.formData[key].value;
        formIsValid = this.state.formData[key].valid && formIsValid;
    }



    if (formIsValid){ //Submit Form
       
        if(this.state.formType === 'Edit player'){

            firebaseDB.ref(`players/${this.state.playerId}`)
            .update(dataToSubmit).then(()=>{
                this.successForm('Update Correctly')
            }).catch(e => 
                this.setState({formError:true})
            )

        }else{ //Add player
            firebasePlayers.push(dataToSubmit).then(()=>{
                this.props.history.push('/admin_players')
            }).catch( e => {
                this.setState({formError : true})
            })
        }

    }else {
        this.setState({
            formError: true
        })
    }

}


resetImage = () => {

    const newFormData = {...this.state.formData};
    newFormData['image'].value = '';
    newFormData['image'].valid = false;
    this.setState({
        defaultImg:'',
        formData:newFormData
    })
}

storeFilename = (filename) => { //update the form
    this.updateForm({id:'image'}, filename)
}

    render (){

        console.log(this.state.formData);

        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event)=>this.submitForm(event)}>

                            <FileUploader
                                dir="players"
                                tag={"Player image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formData.image.value}
                                resetImage={()=>this.resetImage()}
                                filename={(filename)=>this.storeFilename(filename)}
                            />

                            <FormField
                                id={'name'}
                                formData={this.state.formData.name}
                                change={(element)=> this.updateForm(element)}
                                //remove Player Image
                                restImage={()=>this.restImage()}
                            />

                            <FormField
                                id={'lastName'}
                                formData={this.state.formData.lastName}
                                change={(element)=> this.updateForm(element)}
                            />

                            <FormField
                                id={'number'}
                                formData={this.state.formData.number}
                                change={(element)=> this.updateForm(element)}
                            />

                            <FormField
                                id={'position'}
                                formData={this.state.formData.position}
                                change={(element)=> this.updateForm(element)}
                            />

                            <div className="success_label">
                                {this.state.formSuccess}
                            </div>

                                {
                                    this.state.formError ? 
                                        <div className="error_label"></div>
                                    :
                                        ''
                                }

                            <div className="admin_submit">
                                    <button onClick={(event)=>this.submitForm(event)} >
                                        {this.state.formType}
                                    </button>
                             </div>

                        </form>
                    </div>
                </div>
            </AdminLayout>
        )
    }
}

export default AddEditPlayers;