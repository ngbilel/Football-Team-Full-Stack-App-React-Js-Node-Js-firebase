import React, {Component} from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/formFields';
import {validate} from '../../ui/misc';
import {firebasePlayers, firebaseDB} from '../../../firebase';

class AddEditPlayers extends Component {

state = {
    player:'',
    formType:'',
    formError:'',
    formSuccess:'',
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
        
    }
}

componentDidMount(){

    const playerId=this.props.match.params.id;

    if(!playerId){ //Add Player

            this.setState({ formType:'Add Player'})

    }else{  //Edit Player

    }
}

updateForm(element){
    const newFormData= { ...this.state.formData} 
    const newElement = {...newFormData[element.id]}

    newElement.value = element.event.target.value;
     
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



submitForm(event){
    event.preventDefault();

    let dataToSubmit ={};
    let formIsValid= true;

    for (let key in this.state.formData){
        dataToSubmit[key]=this.state.formData[key].value;
        formIsValid = this.state.formData[key].valid && formIsValid;
    }



    if (formIsValid){


        /* Check Add or Edit Match
        if(this.state.formType === 'Edit Match'){
            firebaseDB.ref(`matches/${this.state.matchId}`)
            .update(dataToSubmit).then(()=>{
                this.successForm('Updated Correctly')
            }).catch((e)=>{
                this.setState({formError: true})
            })
        }
        else{ //Add Match
            firebaseMatches.push(dataToSubmit).then(()=>{
                this.props.history.push('/admin_matches');
            }).catch((e)=>{
                this.setState({
                    formError: true
                })
            })
        }*/

    }else {
        this.setState({
            formError: true
        })
    }

}


    render (){
        return (
            <AdminLayout>
                <div className="editplayers_dialog_wrapper">
                    <h2>
                        {this.state.formType}
                    </h2>
                    <div>
                        <form onSubmit={(event)=>this.submitForm(event)}>
                            <FormField
                                id={'name'}
                                formData={this.state.formData.name}
                                change={(element)=> this.updateForm(element)}
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