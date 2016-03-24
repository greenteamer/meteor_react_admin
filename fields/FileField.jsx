import React, {Component} from 'react';


export default class FileField extends Component {

	fileUpload(e){
		// няш загрузка файликов )) 
		e.preventDefault();
		var collection_name = this.props.c_name;
		var obj_id = this.props.obj._id;
		console.log(e.target.files.length);
		FS.Utility.eachFile(e, function(file) {
			// проходимся по всем файликам которые загружаем
			Images.insert(file, function (err, fileObj) {
				if (fileObj){
					var cursor = Images.find(fileObj._id);
					var liveQuery = cursor.observe({
						// подписываемся на изменения файла который загружается в данный момент
						changed: function(newImage, oldImage){
							console.log("newImage: ", newImage, " oldImage: ", oldImage );
							if (newImage.url() !== null) {
								// проверяем готов ли url для файла что бы отрисовать его прикольненько )) 
								// пушим в массив фоток нужного объекта
								liveQuery.stop();
								var image_url = "/cfs/files/images/" + newImage._id;
								Meteor.call("pushImageToObj", collection_name, obj_id, image_url);
							}
						}
					});
				}
			});
		});
	}

	delFile(e){
		e.preventDefault();
		var collection_name = this.props.c_name;
		var obj_id = this.props.obj._id;
		var image_id = e.target.id;
		var condition = {};
		condition[this.props.c_field_name] = { image_id: image_id };
		Meteor.call("pullImageFromObj", collection_name, obj_id, condition, image_id);
	}


	render(){
		if (!this.props.obj) {
			return <div>Нет данных</div>
		}
		if (!this.props.obj.images) {
			this.props.obj.images = [];
		}
		if (this.props.obj.images) {
			this.props.obj.images.forEach( (img)=>{
				if (!img.image_id) {
					return <div>фото не загружено</div>
				}
			});
		}
		return(
			<div className="form-group">
				<div className="image-group">
					{this.props.obj[this.props.c_field_name].map( (img)=> {
						var arr = img.url.split("/");
						var id = arr[arr.length -1];
						return (
							<div key={id} className="image-in-form">
								<img src={img.url} width="100" />
								<i 	onClick={this.delFile.bind(this)}
									id={id}
									className="btn btn-danger fa fa-times"></i>
							</div>
						);
					})}
					<div className="input-file">	
						<input onChange={this.fileUpload.bind(this)} 
							type="file" 
							multiple="true"
							id="file" />
						<label className="file-upload-label" htmlFor="file"><img width="100" src="/images/photo.png" alt=""/></label>
					</div>
				</div>

			</div>
		)
	}
}