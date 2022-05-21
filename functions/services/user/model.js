const { firestore } = require("firebase-admin");
const { admin, Collection } = require("../../utils/admin");

class Model {
    async _createUser(inputs) {
        return admin.auth().createUser({ email: inputs.email, password: inputs.password }).then((user) => {
            const userRef = Collection.doc(user.uid)
            const userInfo = {}
            Object.entries(inputs).forEach(([key, value]) => {
                if (key !== "password") {
                    userInfo[key] = value
                }
            })
            return userRef.set({
                ...userInfo,
                createdAt: firestore.FieldValue.serverTimestamp()
            }).catch((err) => {
                throw err
            })
        })
    }
    async _getUser(id) {
        return Collection.doc(id).get().then((user) => {
            return user.data()
        }).catch((err) => {
            throw err
        })
    }
    async _getUsers() {
        return Collection.get().then((users) => {
            let userInfo = []
            users.forEach((user) => {
                userInfo.push({
                    ...user.data(),
                })
                return userInfo
            }).catch((err) => {
                throw err
            })
        })
    }
    async _updateUser(id, inputs) {
        return Collection.doc(id).update({ inputs, id: id }).then(() => { return true }).catch(err => { throw err })
    }
    async _deleteUser(id, inputs) {
        return Collection.doc(id).delete().then(() => { return true }).catch(err => { throw err })
    }
}

module.exports = Model