/*!
 * Image Loader Angular v1.0.7
 * (c) 2016 Sepehr Amoor Pour
 * Released under the MIT License.
 */
angular.module('sap.imageloader', [])

.factory('ImageLoader', ['$q', function($q){
	return {
		loadImages: function (images, srcProperty) {
			srcProperty = typeof srcProperty !== "undefined" ? srcProperty : "src";
			try {
				var promises = [];
				if (Array.isArray(images)) {
					for (var i = 0; i < images.length; i++) {
						var image = this.loadImage(images[i], srcProperty);
						promises.push(image);
					}
				}
				else {
					throw new TypeError("No image list provided");
				}
			} catch(e) {
				console.error(e);
			};

			return $q.all(promises);
		},

		loadImage: function(image, srcProperty) {
			srcProperty = typeof srcProperty !== "undefined" ? srcProperty : "src";
			var deferred = $q.defer()
			var imageObject = new Image();

			imageObject.onload = function() {
				if (typeof image === "object") {
					image[srcProperty] = imageObject.src;
				}
				else if (typeof image === "string") {
					image = imageObject.src;
				}
				deferred.resolve(image);
				return deferred.promise;
			};

			try {
				if (typeof image === "object") {
					imageObject.src = image[srcProperty]
				}
				else if (typeof image === "string") {
					imageObject.src = image;
				}
				else(
					throw new TypeError("No image provided");
				)
			} catch(e) {
				console.error(e);
			};
		}
	};
}]);