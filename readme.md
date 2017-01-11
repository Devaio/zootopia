# File Uploads

## Couple different ways to store images

1. File Server - amazon s3
  - Can be run through a CDN for faster delivery
  - Costs money
  
2. Your Server - fs module
  - Costs _less_ money
  - you probably don't have your files mirrored in different servers across the globe

## Modules / Libraries

### Front-End
- `ngFileUpload`
  - Angular doesn't deal with file inputs so this library gives the functionality we need
  
### Back-End
- `connect-multiparty`
  - bodyparser for another form of data
    - Multi-Part Form Data (Files & Data)

- `s3`
  - High-level module dealing with Amazon S3
  - will allow us to upload files to their server
  


