package com.dota2social;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.List;
import com.custommodules.toast.*;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.SQLException;

import 


public class Dota2SocialBD extends Application implements ReactApplication {


	// function for a database creation

public static void createNewDatabase(String filename) {
 
        String url = "jdbc:sqlite:C:/sqlite/" + filename;
 
        try (Connection conn = DriverManager.getConnection(url)) {
            if (conn != null) {
                DatabaseMetaData meta = conn.getMetaData();
                System.out.println("The driver name is " + meta.getDriverName());
                System.out.println("A new database has been created.");
            }
 
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
  public static void main(String[] args) {
       let d2db = createNewDatabase("dota2social.db");
    }
}
	
console.log("this database", createNewDatabase)

// table columns for a game

CREATE TABLE IF NOT EXISTS dota2social.game (
 game_id INT PRIMARY KEY NOT NULL,
 textview TEXT  NULL,
 view BLOG DEFAULT 0,
 scrollview BLOG NOT NULL,
 touchableopacity TEXT NULL;
 image BLOG NULL,
 table_constraint
) [WITHOUT ROWID];


// table for columns for statistics 

CREATE TABLE IF NOT EXISTS dota2social.statistics (
 stats_id INT PRIMARY KEY NOT NULL,
 match INT DEFAULT 0,
 score INT DEFAULT 0,
) [WITHOUT ROWID];



// table providing the statistics of a game

CREATE TABLE game_statistics (
 game_id integer,
 stats_id integer,
 PRIMARY KEY (game_id, stats_id),
 FOREIGN KEY (game_id) REFERENCES game (game_id) 
 ON DELETE CASCADE ON UPDATE NO ACTION,
 FOREIGN KEY ([ stats_id ]) REFERENCES statistics (stats_id) 
 ON DELETE CASCADE ON UPDATE NO ACTION
);


// connection to dota2Social database created

private void componentWillMounts(){


if ( Xmatch !=null ) { // callback method to look into database to be written }

else { // callback method to make a call at OpenDota API to be written }
}



}

