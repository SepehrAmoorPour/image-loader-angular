/*!
 * Image Loader Angular v1.0.0
 * (c) 2016 Sepehr Amoor Pour
 * Released under the MIT License.
 */
angular.module('sap.imageloader', [])

.factory('ImageLoader', ['$q', function($q){
	var imageLoader = {
		loadImages: function (images, srcProperty) {
			srcProperty = typeof srcProperty !== "undefined" ? srcProperty : "src";
			var promises = [];
			for (var i = images.length - 1; i >= 0; i--) {
				var image = this.loadImage(images[i], srcProperty);
				promises.push(image);
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

			if (typeof image === "object") {
				imageObject.src = image[srcProperty]
			}
			else if (typeof image === "string") {
				imageObject.src = image;
			}
		}
	};

	return imageLoader;
}]);