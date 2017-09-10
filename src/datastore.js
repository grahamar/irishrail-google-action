import Datastore from '@google-cloud/datastore';
import { map } from 'lodash';

const ds = Datastore({ projectId: 'livedartapp' });
const kind = 'Profile';

const fromDatastore = (obj) => {
  obj.id = obj[Datastore.KEY].id;
  return obj;
};

const toDatastore = (obj, nonIndexed) => {
  nonIndexed = nonIndexed || [];
  return map(obj, (value, name) => {
    if (value) {
      return {
        name,
        value,
        excludeFromIndexes: nonIndexed.indexOf(name) !== -1
      };
    }

    return;
  });
};

export const save = (id, data) => {
  return new Promise((resolve, reject) => {
    const entity = {
      key: ds.key([kind, id]),
      data: toDatastore(data, ['description'])
    };

    ds.save(entity, (err) => {
      if (err) {
        reject(err);
      } else {
        data.id = entity.key.id;
        resolve(data);
      }
    });
  });
};

export const read = (id) => {
  return new Promise((resolve, reject) => {
    const key = ds.key([kind, id]);
    ds.get(key, (err, entity) => {
      if (err) {
        reject(err);
        return;
      }
      if (!entity) {
        resolve(null);
        return;
      }
      resolve(fromDatastore(entity));
    });
  });
}
