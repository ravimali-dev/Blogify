import { Client, ID, TablesDB, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new TablesDB(this.client); // 
        this.bucket = new Storage(this.client);
    }

    // ✅ Post banana → createRow
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId, // ✅ tableId
                rowId: slug,
                data: { title, content, featuredImage, status, userId }
            })
        } catch (error) {
            console.log("createPost error", error);
        }
    }

    // ✅ Post update karna → updateRow
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data: { title, content, featuredImage, status }
            })
        } catch (error) {
            console.log("updatePost error", error);
        }
    }

    // ✅ Post delete karna → deleteRow
    async deletePost(slug) {
        try {
            await this.databases.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            })
            return true
        } catch (error) {
            console.log("deletePost error", error);
            return false
        }
    }

    // ✅ Ek post lena → getRow
    async getPost(slug) {
        try {
            return await this.databases.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug
            })
        } catch (error) {
            console.log("getPost error", error);
            return false
        }
    }

    // ✅ Saari posts → listRows
    async getPosts(queries = [Query.equal("status", ["active"])]) {
        try {
            return await this.databases.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries
            })
        } catch (error) {
            console.log("getPosts error", error);
            return false
        }
    }

    // ✅ Image upload — same hai
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("uploadFile error", error);
            return false
        }
    }

    // ✅ Image delete — same hai
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("deleteFile error", error);
            return false
        }
    }

    // ✅ Image preview — same hai
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service