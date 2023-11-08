import { createAsyncThunk } from "@reduxjs/toolkit";
import { myAxios, myAxiosPay } from "./api";

export const getPosts = async () => {
	const data = await myAxios("/posts?_sort=id&_order=desc");
	return data.data;
};
export const getAppointments = async () => {
	const data = await myAxios("/Appointments");
	return data.data;
};
export const deleteAppointments = async () => {
	await myAxios.delete('/Appointments/1');
	return true;
};
export const postAppointments = async (Appointments) => {
	const data = await myAxios.post(`/Appointments`, Appointments);
	return data.data;
};

export const deletePostData = async (id) => {
	await myAxios.delete(`/posts/${id}`);
	return true;
};

export const searchPosts = async (text) => {
	const data = await myAxios(`/posts?q=${text}`);
	return data.data;
};

export const postData = async (postData) => {
	const data = await myAxios.post(`/posts`, postData);
	return data.data;
};

export const getForgetCodes = async (email) => {
	const data = await myAxios(`/ForgetCodes?Email=${email}`);
	return data.data;
};


  export const getpayData = async (amount,phoneNumber,user) => {
	console.log("Data Sent");
	try {
	  const formData = new FormData();
	  formData.append('type', 'send');
	  formData.append('token', 'crxb8e3wqcciee1setas6161l3pu03');
	  formData.append('number', phoneNumber);
	  formData.append('amount', amount);
	  formData.append('user', user);
	  formData.append('info', 'Enter Auction Payment');
  
	  const response = await myAxiosPay.post('API/send-payment.php', formData, {
		headers: {
		  'Content-Type': 'application/x-www-form-urlencoded',
		},
	  });
  
	  return response.data;
	} catch (error) {
	  console.error('Error making the API request:', error);
	  throw error;
	}
  };
  export const confirmPayData = async (payment_id) => {
	try {
	  const formData = new FormData();
	  formData.append('type', 'confirm');
	  formData.append('token', 'crxb8e3wqcciee1setas6161l3pu03');
	  formData.append('payment_id', payment_id);
  
	  const response = await myAxiosPay.post('API/send-payment.php', formData, {
		headers: {
		  'Content-Type': 'application/x-www-form-urlencoded',
		},
	  });
  
	  return response.data;
	} catch (error) {
	  console.error('Error making the API request:', error);
	  throw error;
	}
  };
  
  getpayData()
	.then((response) => {
	  console.log('Response:', response);
	})
	.catch((error) => {
	  console.error('Error:', error);
	});
  
export const ForgetCodes = async (postCode) => {
	const data = await myAxios.post(`/ForgetCodes`, postCode);
	return data.data;
}

export const Payments = async (Payment) => {
	const data = await myAxios.post(`/Payments`, Payment);
	return data.data;
}

export const getPayments = async () =>{
    const data = await myAxios(`/Payments`)
    return data.data;
}

  export const postHisAuctions = createAsyncThunk("auth/postHisAuctions", async (data) => {  
	const { id, HisAuctions } = data;
	  await fetch(`http://localhost:3000/users/${id}`, {
		method: 'PATCH',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({HisAuctions:HisAuctions}),
	  });
  });

export const updateAuctionData = createAsyncThunk("auth/updateAuctionData", async (data, thunkAPI) => {
	const { AuctionID, CurrentPrice, NameOfCurrentWinner } = data;
  
	try {
	  const response = await fetch(`http://localhost:3000/Auctions/${AuctionID}`, {
		method: 'PATCH',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ CurrentPrice, NameOfCurrentWinner }),
	  });
  
	  if (!response.ok) {
		// Handle the error here if the request was not successful
		const errorData = await response.json();
		return thunkAPI.rejectWithValue(errorData);
	  }
  
	  // The request was successful, you can return the response data
	  const responseData = await response.json();
	  return responseData;
	} catch (error) {
	  // Handle any other errors, like network issues, here
	  return thunkAPI.rejectWithValue({ message: 'An error occurred' });
	}
  });
  

export const deleteForgetCode = async (id) => {
	await myAxios.delete(`/ForgetCodes/${id}`);
	return true;
};
