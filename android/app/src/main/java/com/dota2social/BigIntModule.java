package com.custommodules.bigints;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.util.Map;
import java.util.HashMap;


public class BigIntModule extends ReactContextBaseJavaModule {
	private static final String E_CONVERSION_ERROR = "E_CONVERSION_ERROR";
	public BigIntModule(ReactApplicationContext reactContext) {
		super(reactContext);
	}

	@Override
	public String getName() {
		return "BigIntModule";
	}

	@ReactMethod
	public void convertSteamID(String id, 
			Callback errorCallback, 
			Callback successCallback) 
	{
		try{
			long converterInt = 76561197960265728L;
			long bigID = Long.parseLong(id);
			long result = bigID - converterInt;
			String callbackReturn = Long.toString(result);
			successCallback.invoke(callbackReturn);
		}catch (ArithmeticException e) {
			errorCallback.invoke(E_CONVERSION_ERROR,e);
		}
	}
}
