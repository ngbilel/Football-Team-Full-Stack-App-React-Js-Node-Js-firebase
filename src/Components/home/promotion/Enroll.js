import React, {Component} from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../../ui/formFields';
import {validate} from '../../ui/misc';
import {firebasePromotions} from '../../../firebase';

class Enroll extends Component  {

    state={
        formError:false,
        formSuccess:'',
        formData:{
            email: {
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your Email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage:''
            }
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

    resetFormSucceess(type){

        const newFormData= { ...this.state.formData} 

        for (let key in newFormData) {
            newFormData[key].value = '';
            newFormData[key].valid = false;
            newFormData[key].validationMessage = '';

        }

        this.setState({
            formError:false,
            formData:newFormData,
            formSuccess: type ? 'Congratulations' : 'Already on the DataBase'
        })

        this.clearSuccessMessage();
    }

     clearSuccessMessage(){
        setTimeout(()=>{
            this.setState({formSuccess: ''})
        },1000)
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

            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once("value")
            .then((snapshot)=>{
                if (snapshot.val() === null){
                    firebasePromotions.push(dataToSubmit);
                    this.resetFormSucceess(true)

                }else {
                    this.resetFormSucceess(false)
                }
            })

            //this.resetFormSucceess();

        }else {
            this.setState({
                formError: true
            })
        }

    }

    render (){
        return (
            <Fade>
                <div className='enroll_wrapper'>
                    <form onSubmit={(event)=>this.submitForm(event)}>
                        <div className='enroll_title'>
                            Enter your Email
                        </div>
                        <div className="enroll_input">
                            <FormField
                                id={'email'}
                                formData={this.state.formData.email}
                                change={(element)=> this.updateForm(element)}
                            />
                                {this.state.formError  ? 
                                <div className="error_label"> Something is Wrong, Try again</div> 
                                : null
                            }
                            <div className="success_label">{this.state.formSuccess}</div>
                            <button onClick={(event) => this.submitForm(event)} >Enroll</button>
                        </div>
                    </form>
                </div>
            </Fade>
        )
    }
}

export default Enroll

