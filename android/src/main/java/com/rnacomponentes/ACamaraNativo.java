package com.rnacomponentes;

import android.app.Activity;
import android.content.Intent;
import android.os.Parcelable;

import androidx.annotation.NonNull;

import com.rnacomponentes.ayudas.EMensajes;
import com.rnacomponentes.ayudas.EResultados;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ACamaraNativo extends ReactContextBaseJavaModule {

    private Promise mPromesa;

    private final ActivityEventListener activityListener = new BaseActivityEventListener(){

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == 0) {
                if (mPromesa != null) {
                    if (resultCode == EResultados.CANCELADO.obtenerValor()) {
                        mPromesa.resolve(EMensajes.CANCELADO.toString());
                    }
                    else if(resultCode == EResultados.EVENTO.obtenerValor()){
                        mPromesa.resolve(EMensajes.EVENTO.toString() + "-Ingresar manualmente");
                    }
                    else if(resultCode == EResultados.CANCELADO.obtenerValor()){
                        mPromesa.resolve(EMensajes.CANCELADO.toString() + "-Cancelado");
                    }
                    else if(resultCode == EResultados.ERROR.obtenerValor()){
                        mPromesa.reject(EMensajes.ERROR.toString(), intent.getStringExtra("codigos_barras"));
                    }
                    else{
                        mPromesa.resolve(intent.getStringExtra("codigos_barras"));
                    }
                    mPromesa = null;
                }
            }
            else{
                mPromesa.reject(EMensajes.ERROR.toString(), "Ocurrio un error durante la comunicación entre los activities.");
                mPromesa = null;
            }
        }

    };

    public ACamaraNativo(ReactApplicationContext reactApplicationContext){
        super(reactApplicationContext);
        reactApplicationContext.addActivityEventListener(activityListener);
    }

    @NonNull
    @Override
    public String getName() {
        return "ACamaraNativo";
    }

    @ReactMethod
    public void LeerCodigo(Promise promesa){
        Activity activityActual =getCurrentActivity();
        if(activityActual == null){
            promesa.reject(EMensajes.ERROR.toString(), "Activity actual no disponible");
            return;
        }

        mPromesa = promesa;

        try{
            final Intent intentoLectura = new Intent(activityActual, ActivityACamaraEscaner.class);
            activityActual.startActivityForResult(intentoLectura, 0);
        }
        catch (Exception ex){
            mPromesa.reject(EMensajes.ERROR.toString(), ex.getMessage());
            mPromesa = null;
        }
    }
}
