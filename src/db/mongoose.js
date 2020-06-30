const mongoose = require('mongoose')

// mongodb+srv://SamiLiveDB:C2IFIwqcwrLNaob8@cluster0-eykna.mongodb.net/test?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://SamiLiveDB:C2IFIwqcwrLNaob8@cluster0-eykna.mongodb.net/test?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})