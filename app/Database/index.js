import { uuid } from '../Tools';
var SharedPreferences = require('react-native-shared-preferences');
const Realm = require('realm');
const Note = {
    name: "Note",
    primaryKey: "id",
    properties: {
        id: 'string',
        title: 'string',
        content: 'string',
        colorID: 'string',
        icon: 'string',
        createdAt: 'date',
        modifiedAt: 'date?',
        specialIndex: 'int'
    }
}
let realm = new Realm({
    schema: [Note],
    schemaVersion: 1,
    migration: (oldRealm, newRealm) => {
        if (oldRealm.schemaVersion < 1) {
            const oldObjects = oldRealm.objects('Note');
            const newObjects = newRealm.objects('Note');
            for (let i = 0; i < oldObjects.length; i++) {
                newObjects[i].specialIndex = i
            }
        }
    }
});
const Notes = realm.objects("Note");
export function getNotes(id,limit,filter) {
    try {
        if(id) {
            return Notes.filtered('id="' + id + '"');
        } else if(filter) {
            return Notes.filtered(filter);
        } else {
            if(limit) {
                return Notes.slice(0,limit);
            } else {
                return Notes;
            }
        }
    } catch (e) {
        alert(e);
    }
}
export function dislocateNotes(index, item, direction) {
    let thisObject = Notes.filtered('id="' + item.id + '"')[0];
    const otherObjectIndex = direction ? index - 1 : index + 1;
    let otherObject = Notes.filtered('specialIndex="' + otherObjectIndex + '"')[0];
    realm.write(() => {
        otherObject.specialIndex = index;
        thisObject.specialIndex = direction ? index - 1 : index + 1
    });
}
export function createNote(data) {
    data.id = uuid();
    data.colorID = uuid();
    data.createdAt = new Date();
    realm.write(() => {
        if(Notes.length > 0) Notes.forEach(item => item.specialIndex++);
        realm.create("Note",data);
    });
}
export function deleteObject(object) {
    try {
        realm.write(() => {
            if(Array.isArray(object)) {
                object.forEach(item => {
                    realm.delete(item);
                });
            } else {
                const data = Notes.filtered('id="' + object.id + '"')[0];
                realm.delete(data);
            }
            if(Notes.length > 0) Notes.forEach((item,index) => index);
        });
    } catch (e) {
        alert(e);
    }
}
export function update(schema,object) {
    realm.write(() => {
        realm.create(schema,object,true);
    });
}
export function resetData() {
    try {
        realm.write(() => {
            realm.deleteAll();
        });
    } catch (e) {
        alert(e);
    }
}
SharedPreferences.getItem("firstRun", function(value){
    if(!value) {
        createNote({
            title: 'Örnek Not',
            content: 'Bu kısımda ki içerik tamamen test amacıyla üretilmiştir. Bu yazılım NİBGAT® | Topluluğu tarafından üretilmiştir. AR-GE çalışmaları da NİBGAT® | Topluluğu tarafından yürütülmektedir. Ve ar-ge çalışmaları halen yürütülmektedir.',
            icon: 'clock-circle',
            specialIndex: 0
        });
        SharedPreferences.setItem("firstRun","true");
    }
});
export default realm;