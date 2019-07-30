1. 注册账号

2. [Unsigned upload](<https://cloudinary.com/documentation/upload_images#unsigned_upload>)

3. [Uploading with a direct call to the API](<https://cloudinary.com/documentation/upload_images>)

4. ```js
   request.post(CLOUDINARY_UPLOAD_URL)
       .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
       .field('file', file);
   ```

+ 和 react-native-view-shot 截图组件一起使用时，react-native-view-shot 的截图设置 options -> result 要设为 data-uri。
+ `CameraRoll.saveToCameraRoll(tag, [type]);` 保存到手机相册，*[reference](<https://reactnative.cn/docs/cameraroll/>)*

