# Library-managment-system
 This is a Library managment api backend for the management of users and the books Here;

# Routes and the endpoints

## /users
GET: Get all the list of users  in the system
POST: create/Register a new user

## /users/{id}
GET: Get a user by their Id
PUT: Updating a user by their Id
DELETE: Deleting a user by theri Id 
 -> check if user still have any issue book  
       &&
 -> Is there any fine || penalty to be collected   

 ## /users/subscription-details/{id}
GET:  Get user subscription details by theri id
  -> Date of subscription
  -> subscription valid till date
  -> Fine if any 

## /books
GET: Get  all the books in the system
POST: Add a new book in the system

## /books/{id}
GET: Get book by its id
PUT: Update book details by its id
DELETE : To delete the book by its id


## /books/issued
GET:  Get all the issue book

## /books/issued/withFine
GET : GET all issued book with their fine amount 

### subscription type
 >> Basic (3 months)
 >> standerd (6 months)
 >> Premium (12 months)

 -> If a user missed the renewal date , then user should be collected with 100 rupe
 -> If a user missed his subscription, then user is expected  to pay 100 rupe 
 -> If user missed both renewal && subscription then the collected amount shoud be  180 rupe



