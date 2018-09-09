# asset_transfer
asset tracker application on hyperledger fabric

## Summary
This project tracks asset within different departments of organization.

## UseCase  
&nbsp;1. Admin adds other users or admins to system, adds assets like (laptop, ipad etc) to system with owner info.  
&nbsp;2. User can search asset and view info like who owns it, currently with owner or not.  
&nbsp;3. User sends request to owner.  
&nbsp;4. Owner can approve request or reject.  
&nbsp;5. User receives asset by confirming in application.  
&nbsp;6. User returns asset and owner confirms it in application.  


### Note

- Request can be cancelled by either owner or user.  
- Once owner has approved request and user has received it, request cannot be cancelled.  
- Once user owner received asset back status moved to closed.  
- User can see his requests for asset (ie.owned by others). 
- User can see requests from other for his assets (ie. owned by him).  
- User can view asset request date wise ie. calendar view.  
- User can view block transactions of his asset.
- Admin can see block transactions of any asset.  
- User can sign up only when admin has added his basic info through admin portal.  

### Project setup  

Create mongo database "asset" and add super admin.  
`{`  
    `"empId" : "130",`  
    `"name" : "asdjnk",`  
    `"email" : "bbb@gmail.com",`  
    `"password" : "6E94B89D29641C4C30E851430B82E3FB026E5304661D0E9F7C8603BA98A44B51",`  
    `"role" : "admin"`  
`}`  

password should be hashed `shajs('sha256').update(email+password).digest('hex').toUpperCase()`.  
role is admin, available roles are (admin, user).  

Deploy project on hyperledger fabric using asset-network.bna.
Start rest server for that network. (Please refer hyperledger documentation)

COMPOSER_IP = rest server ip.
COMPOSER_PORT = rest server port.
COUCH_PORT = couch db port. (Couch db ip and rest server ip considered as same).

Run Server
npm run server
visit http://localhost:3030

### TODO  
apis should be protected based on role.  
rest server should be protected.  
test cases.  


