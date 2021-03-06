import {db} from '../firebase';
// get repositories without any filter
export async function getRepos(nodeId, searchRepo, filterLanguage, sortMethod, sortOrder) {

  let firstPage = db.collection('repositories').orderBy(sortMethod,sortOrder).limit(20).startAfter(nodeId);

  if (filterLanguage !== 'All' && searchRepo !== '')
    firstPage = db.collection('repositories').orderBy(sortMethod, sortOrder).where('full_name', '==', searchRepo)
      .where('language', '==', filterLanguage).limit(20).startAfter(nodeId);
  else if (filterLanguage !== 'All')
    firstPage = db.collection('repositories').orderBy(sortMethod, sortOrder).where('language', '==', filterLanguage).limit(20).startAfter(nodeId);
  else if (searchRepo !== '')
    firstPage = db.collection('repositories').orderBy(sortMethod, sortOrder).where('full_name', '==', searchRepo).limit(20).startAfter(nodeId);
    // firstPage = db.collection('repositories').orderBy(sortMethod).where('full_name', '>=', + '\uf8ff' + searchRepo).where('full_name', '<=', searchRepo).limit(20).startAfter(nodeId);

  return firstPage.get().then(snapshot => {
    return snapshot;
  }).catch(() => {
    return null;
  });
}

export async function getLanguageList() {
  return db.collection('languages').doc('languages').get().then(res => {
    return res.data().language.sort();
  });
}
