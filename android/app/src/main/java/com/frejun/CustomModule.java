package com.frejun;

import android.provider.Settings;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CustomModule extends ReactContextBaseJavaModule {
    private  static  ReactApplicationContext reactContext;

    CustomModule(ReactApplicationContext context){
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "Toaster";
    }

    @ReactMethod
    public void showToast(String message){
        Toast.makeText(reactContext,message,Toast.LENGTH_LONG).show();
    }

    @ReactMethod
    public void getDeviceId(Promise promise){
        try{
            String androidId = Settings.Secure.getString(reactContext.getContentResolver(),Settings.Secure.ANDROID_ID);
            promise.resolve(androidId);
        }catch(Exception e){
            promise.reject(e);
        }
    }
}
