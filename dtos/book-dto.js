// Data transfer object

//  class IssueBook which  filter the  required fields for me 
//  from  User Model in which  ref: book model by Id
class IssueBook {
    //  why  ; not ,
    //  Class properties must be written line-by-line
    // Because JavaScript class body does not accept commas for property definitions.
    _id;
    name;
    author;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;

//  this is my constructor which run whenever i make new IssueBook runs automaticaly  all fill the data
    constructor(user) {
        this._id = user.IssueBook._id;
        this.name = user.IssueBook.name;
        this.author = user.issueBook.author;
        this.genre = user.issueBook.genre;
        this.price = user.issueBook.price;
        this.publisher = user.issueBook.publisher;
        this.issuedBy = user.name;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;

    }
}

module.exports = IssueBook;
