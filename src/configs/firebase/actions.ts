import { addDoc, collection, DocumentData, getDocs, query, where } from 'firebase/firestore';
import {db} from '.';

export const add = async(collectionName: string, data: object) => {
    return addDoc(collection(db,collectionName),data).then((docRef) => {
        return {...data,id:docRef.id};
    })
}

export const whereQuery = async(
    collectionName: string,
    field: string,
    value: string
) => {
    return getDocs(
        query(collection(db,collectionName),where(field,"==",value))
    ).then((querySnapshot) => {
        let results: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            if(data){
                data = { ...data, id: doc.id};
            }
            results.push(data);
        })
        return results;
    })
}