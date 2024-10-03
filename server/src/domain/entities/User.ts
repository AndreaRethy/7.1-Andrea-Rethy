import { Publication } from './Publication.js'

export class User {
   public id: Number;
   public username: String;
   public password: String;
   public name: String;
   public createdAt: Date | undefined;
   public role: "USER" | "ADMIN" = "USER";
   public isBanned: Boolean = false;
   public publications: Publication[] = [];
   public likedPublications: Publication[] = [];

   constructor(id: Number, username: String, password: String, name: String, createdAt: Date | undefined) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.createdAt = createdAt;
   }
}