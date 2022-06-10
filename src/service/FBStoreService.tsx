import { getFirestore, doc, collection, updateDoc, setDoc, deleteDoc, getDoc, getDocs } from 'firebase/firestore';
import firebase from './FBConfig';

const firebaseStore = getFirestore(firebase);

const FBStoreService = {
    GetAllStoreData: async (store: string) => {
        try {
            let data: any[] = [];
            const querySnapshot = await getDocs(collection(firebaseStore, store));
            querySnapshot.forEach((q) => {
                data.push({ ...q.data(), id: q.id })
            })

            return {
                postId: data
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err);
                return {
                    error: err.message,
                };
            } else {
                return { error: "error" }
            }
        }
    },
    GetOneStoreData: async (store: string, id: string) => {
        try {
            const querySnapshot = await getDoc(doc(firebaseStore, store, id));

            return {
                postId: { ...querySnapshot.data(), id: querySnapshot.id }
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err);
                return {
                    error: err.message,
                };
            } else {
                return { error: "error" }
            }
        }
    },
    CreateStoreData: async (store: string, body: any) => {
        try {
            const newDocRef = doc(collection(firebaseStore, store));
            const docRef = await setDoc(newDocRef, { ...body });
            return {
                postId: docRef
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err);
                return {
                    error: err.message,
                };
            } else {
                return { error: "error" }
            }
        }
    },
    RemoveStoreData: async (id: string, store: string) => {
        try {
            const docRef = await deleteDoc(doc(firebaseStore, store, id));
            return {
                id: id
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err);
                return {
                    error: err.message,
                };
            } else {
                return { error: "error" }
            }
        }
    },
    UpdateStoreData: async (id: string, body: any, store: string) => {
        try {
            const newDocRef = doc(firebaseStore, store, body.id);
            const docUpdate = await updateDoc(newDocRef, body);
            return {
                id: docUpdate
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err);
                return {
                    error: err.message,
                };
            } else {
                return { error: "error" }
            }
        }
    },

};

export default FBStoreService;