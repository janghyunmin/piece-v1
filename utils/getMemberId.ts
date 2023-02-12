import Storage from "@react-native-async-storage/async-storage";

export const get_member_id = async () => {
  const auth = await Storage.getItem('@auth');
  if (auth) {
    console.log('getMemberId : ' + JSON.parse(auth)?.memberId);
    return JSON.parse(auth)?.memberId;
  }
};
