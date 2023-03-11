
const sendFormDataMessage = async (aligoSender, receiver, paragraph: string, imageFileStream,) => {
	try {
		const formData = new FormData();
		formData.append('key', aligoAuth.key);
		formData.append('user_id', aligoAuth.user_id);
		formData.append('sender', aligoSender);
		formData.append('receiver', receiver);
		formData.append("msg", paragraph);
		formData.append('image', imageFileStream);
		formData.append('msg_type', 'MMS')
		
		const result = await axios.post(ALIGO_FORMDATA_URL as string, formData, {
			headers: {
				'Content-type': 'multipart/form-data'
			}
		});
		if (result.status !== 200) throw Error(result.toString());
		
		return 1;
	} catch (e) {
		return e;
	}
}