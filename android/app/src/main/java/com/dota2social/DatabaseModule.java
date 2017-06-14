package com.custommodules.dotabase;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.util.Map;
import java.util.HashMap;
import java.io.File;

import org.json.JSONObject;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteCantOpenDatabaseException;
import android.database.sqlite.SQLiteOpenHelper;

import android.content.ContentValues;

public class DatabaseModule extends ReactContextBaseJavaModule {
	public DatabaseModule(ReactApplicationContext reactContext) {
		super(reactContext);
	}

	@Override
	public String getName() {
		return "DatabaseModule";
	}


	@ReactMethod
	public void fetchDatabase(
	String matchID,
	String match,
	Callback errorCallback,
	Callback successCallback
	){
		String result = "";
		try{
			SQLiteDatabase myDB = getReactApplicationContext().openOrCreateDatabase("dotabase", android.content.Context.MODE_PRIVATE, null);
			Cursor mcursor = myDB.rawQuery(query, new String[] {matchID});

			if(mcursor != null)
			{
				if (mcursor.moveToFirst()) {
					result = mcursor.getString(0); // matchID
				}
			}

			successCallback.invoke(result);

		}catch (SQLiteCantOpenDatabaseException e) {
			errorCallback.invoke("Critical database fetch error: " + e.toString(), e.toString());
		}
	}

	@ReactMethod
	public void createDatabase(
	String matchID,
	String match,
	Callback errorCallback,
	Callback successCallback
	)
	{
		try{
			SQLiteDatabase myDB = getReactApplicationContext().openOrCreateDatabase("dotabase", android.content.Context.MODE_PRIVATE, null);
			String cleanedMatch = match.replace("'", "");
			myDB.execSQL("CREATE TABLE IF NOT EXISTS "
			+ "matches"
			+ " (id VARCHAR, json VARCHAR);");
			myDB.execSQL("INSERT INTO "
			+ "matches"
			+ " (id, json)"
			+ " VALUES ('" + matchID + "', ' " + cleanedMatch + " ');");
			successCallback.invoke("Match " + matchID + " added to database.");
		} catch (SQLiteCantOpenDatabaseException e) {
			errorCallback.invoke("Critical database insert error: " + e.toString(), e.toString());
		}
	}
}
