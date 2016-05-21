# image-loader-angular

An AngularJS module containing for loading images to be put in image tags in the markup of application. Using this module to load images will keep remove the responsibility of loading images from the view and thus not block its rendering process. Compatible with AngularJS 1.2.14 up to 1.5.

## Installation
Use npm to install the module:
> npm install image-loader-angular

## Directive
Use the directive <loaded-image> as a substitute for the <img> tag. The directive will load the image and insert it into the view markup as an <img> tag. All attributes included in the <loaded-image> directive will be added to the <img> tag. First include the ImageLoader module to the app.

```javascript
// Include the image-loader in your module dependencies
var exampleApp = angular.module('exampleApp',['sap.imageloader']);
```

```html
<div>
  <loaded-image src="{{ imageSrc }}"></loaded-image>
</div>
```

## Service
Use the service in your AngularJS controller to load your images before inserting them into your view.

### Image source is a string
####Controller
```javascript
// Include the image-loader in your module dependencies
var exampleApp = angular.module('exampleApp',['sap.imageloader']);

exampleApp.controller('ExampleController', ['$scope', 'ImageLoader', function($scope, ImageLoader) {
  var myImageSrc = 'http://someimagesource.com/example.jpg';
  ImageLoader.loadImage(myImageSrc).then(function(loadedSrc) {
    $scope.imageSrc = loadedSrc;
  });
}]);
```

####View
```html
<div>
  <img ng-src="{{ imageSrc }}" />
</div>
```

### Image source is an object property
####Controller
```javascript
exampleApp.controller('ExampleController', ['$scope', 'ImageLoader', function($scope, ImageLoader) {
  var myObject = {
    myImageSrc: 'http://someimagesource.com/example.jpg'
  };

  // Second parameter of loadImage is the object key for the image source, default is "src".
  ImageLoader.loadImage(myObject, 'myImageSrc').then(function(loadedObject) {
    $scope.imageObject = loadedObject;
  });
}]);
```

####View
```html
<div>
  <img ng-src="{{ imageObject.myImageSrc }}" />
</div>
```

### List of image objects or strings
####Controller
```javascript
exampleApp.controller('ExampleController', ['$scope', 'ImageLoader', function($scope, ImageLoader) {
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

#### View
```html
<!--Strings-->
<div>
  <img ng-repeat="imageSrc in imageStringsList" ng-src="{{ imageSrc }}" />
</div>

<!--Objects-->
<div>
  <img ng-repeat="imageObject in imageObjectsList" ng-src="{{ imageObject.myImageSrc }}" />
</div>
```
