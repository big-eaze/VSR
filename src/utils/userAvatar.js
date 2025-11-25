const avatarKey = (uid) => (uid && `avatar_${uid}`);

export function saveAvatar(uid, url) {
  localStorage.setItem(avatarKey(uid), url);
}
export function getAvatar(uid) {
  return localStorage.getItem(avatarKey(uid)) || null;
}