import bcrypt from "bcrypt"
import mongooes from 'mangooes'

const userSchema = mongooes.Schema({
    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true,unique:true},
    password:{type:String, minimum:6 , required:true,trim:true},
    isAdmin:{type:Boolean, required: true},
    imageURL:{type:String}

},
{timrstamp:true},
)

const User = mongooes.model("User", userSchema)

User.pre('save',()=> {
    if(this.modified('password')){
        this.password = bcrypt.hashSync(this.password, 10)
    }
}

)

export default user



