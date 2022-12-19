/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) {
    return callback(new Error('file is empty'), false);
  }
  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'png', 'jpeg', 'gif'];
  const maxSize = 2048;

  if (!validExtensions.includes(fileExtension)) {
    return callback(new Error('file extension is not valid'), false);
  }

  if (maxSize < file.size) {
    return callback(new Error('file size is not valid max (2mb)'), false);
  }

  return callback(null, true);
};
