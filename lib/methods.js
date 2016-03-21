Meteor.methods({
	delImage(id){
		Images.remove(id);
	},

	pushImageToObj(collection_name, obj_id, image_url){
		// метод принимает строчное название коллекции, id объекта и url изображения
		// добавляет в массив images объект {url: image_url}
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		// console.log("start pushImage");

		var collection = Mongo.Collection.get(collection_name);
		// console.log('collection: ', collection, 'obj_id: ', obj_id, 'image_url: ', image_url);
		var arr = image_url.split("/");
		var id = arr[arr.length -1];
		collection.update(obj_id, {
			$push: { 
				images: { 
					image_id: id,
					url: image_url 
				} 
			} 
		});
	},

	pullImageFromObj(collection_name, obj_id, condition, image_id){
		// удаляет из массива images объект {url: image_url}
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		var collection = Mongo.Collection.get(collection_name);
		collection.update(obj_id, {
			$pull: condition
		}, (err, result)=>{
			console.log(err, result);
			if (result) {
				Meteor.call("delImage", image_id);
			}
		});
	},

	updateTextInObj(collection_name, field_name, id, value){
		var value_obj = {};
		value_obj[field_name] = value;
		var collection = Mongo.Collection.get(collection_name);
		collection.update(id, {$set: value_obj});
	}
})