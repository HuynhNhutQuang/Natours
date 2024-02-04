import axios from 'axios';
import { showAlert } from './alerts';
export const updateSetting = async (data, type) => {
  try {
    const url =
      type === 'data' ? '/api/v1/users/me' : '/api/v1/users/updateMyPassword';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
