Meteor.methods({

	addEmptyObj(collection_name){
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		var collection = Mongo.Collection.get(collection_name);
		collection.insert({});
	},
	
	delObj(collection_name, obj_id){
		if (!Meteor.userId()) {
			throw new Meteor.Error('not-authorized');
		}
		var collection = Mongo.Collection.get(collection_name);
		collection.remove(obj_id);
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
		// console.log('arr: ', arr, 'id: ', id);
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
				Meteor.call("delObj", "images", image_id);
			}
		});
	},

	updateFieldInObj(collection_name, field_name, id, value){
		var value_obj = {};
		value_obj[field_name] = value;
		var collection = Mongo.Collection.get(collection_name);
		collection.update(id, {$set: value_obj});
	},

})