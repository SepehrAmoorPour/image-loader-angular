# image-loader-angular

An AngularJS service for loading images to be put in image tags in the markup of application. Using this service to load images will keep remove the responsibility of loading images from the view and thus not block its rendering process. Compatible with AngularJS 1.2.14 and higher.

## Installation
Use npm to install the service:
> npm install npm i image-loader-angular

## Usage

Use the service in your AngularJS controller to load your images before inserting them into your view.

### Image source is a string
Controller
```javascript
// Include the image-loader in your module dependencies
var exampleApp = angular.module('exampleApp',['sap.imageloader']);

myApp.controller('ExampleController', ['$scope', function($scope, ImageLoader) {
  var myImageSrc = 'http://someimagesource.com/example.jpg';
  ImageLoader.loadImage(myImageSrc).then(function(loadedSrc) {
    $scope.imageSrc = loadedSrc;
  });
}]);
```
View
```html
<div>
  <img ng-src="{{ imageSrc }}" />
</div>
```

### Image source is an object property
Controller
```javascript
// Include the image-loader in your module dependencies
var exampleApp = angular.module('exampleApp',['sap.imageloader']);

myApp.controller('ExampleController', ['$scope', function($scope, ImageLoader) {
  var myObject = {
    myImageSrc: 'http://someimagesource.com/example.jpg'
  };

  // Second parameter of loadImage is the object key for the image source, default is "src".
  ImageLoader.loadImage(myObject, 'myImageSrc').then(function(loadedObject) {
    $scope.imageObject = loadedObject;
  });
}]);
```
View
```html
<div>
  <img ng-src="{{ imageObject.myImageSrc }}" />
</div>
```

### List of image objects or strings
Controller
```javascript
// Include the image-loader in your module dependencies
var exampleApp = angular.module('exampleApp',['sap.imageloader']);

myApp.controller('ExampleController', ['$scope', function($scope, ImageLoader) {
  var myStringsList = [
    'http://someimagesource.com/example.jpg',
    'http://someimagesource.com/example2.jpg'
  ]
  
  var myObjectsList = [
    {myImageSrc: 'http://someimagesource.com/example.jpg'},
    {myImageSrc: 'http://someimagesource.com/example2.jpg'}
  ];

  // List of strings
  ImageLoader.loadImages('myStringsList').then(function(loadedStrings) {
    $scope.imageStringsList = loadedStrings;
  });

  // List of objects
  // Second parameter of loadImages is the object key for the image source, default is "src".
  ImageLoader.loadImages(myObjectsList, 'myImageSrc').then(function(loadedObjects) {
    $scope.imageObjectsList = loadedObjects;
  });
  
}]);
```

View
```html
<!--Strings-->
<div>
  <img ng-repeat="imageSrc in imageStringsList" ng-src="{{ imageSrc }}" />
</div>

<!--Objects-->
<div>
  <img ng-repeat="imageObject in imageObjectsList" ng-src="{{ image.myImageSrc }}" />
</div>
```
