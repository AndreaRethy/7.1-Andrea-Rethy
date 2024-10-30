import { User } from './User.js';

export class Publication {
    public id: Number;
    public title: String;
    public image: String;
    public content: String;
    public createdAt: Date | undefined;
    public updatedAt: Date | undefined;
    public likeCount: Number;
    public isDeleted: Boolean = false;
    public author?: User;
    public likedBy: User[] = [];

    constructor(id: Number, title: String, image: String, content: String, createdAt: Date | undefined, updatedAt: Date | undefined, likeCount: Number, author?: User) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.likeCount = likeCount;
        this.author = author;
    }
}