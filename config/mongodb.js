const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://System:1234@cluster0.mqpfc.mongodb.net/Program?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(ok => console.log('MongoDB Connected'))
.catch(err => console.log('Error connecting to MongoDB',err));