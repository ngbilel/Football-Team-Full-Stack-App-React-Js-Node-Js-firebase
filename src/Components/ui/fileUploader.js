import React, {Component} from 'react';
import {firebase} from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress'
import 'firebase/storage';  


class Fileuploader extends Component {
    state={
        name:'',
        isUploading:false,
        fileURL:''
    }

    static getDerivedStateFromProps(props,state){
        if(props.defaultImg){
            return state ={
                name:props.defaultImgName,
                fileURL:props.defaultImg
            }
        } 
        return null 
    }

    render(){
        return (
             <div>
                 { 
                     !this.state.fileURL ?
                        <div>
                            <div className="label_inputs"> {this.props.tag}</div>
                            <FileUploader
                                accept="image/*"
                                name="image"
                                randomizeFilename
                                storageRef={firebase.storage().ref(this.props.dir)}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                            />
                        </div>
                     :
                        null

                 } 

            </div>
        )
    }
}

export default Fileuploader;