package com.rnacomponentes;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.camera.core.CameraSelector;
import androidx.camera.core.ImageAnalysis;
import androidx.camera.core.ImageCapture;
import androidx.camera.core.ImageProxy;
import androidx.camera.core.Preview;
import androidx.camera.lifecycle.ProcessCameraProvider;
import androidx.camera.view.PreviewView;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentManager;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Point;
import android.graphics.Rect;
import android.media.Image;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.util.Size;
import android.widget.Button;

import com.rnacomponentes.ayudas.EMensajes;
import com.rnacomponentes.ayudas.EResultados;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.mlkit.vision.barcode.BarcodeScanner;
import com.google.mlkit.vision.barcode.BarcodeScannerOptions;
import com.google.mlkit.vision.barcode.BarcodeScanning;
import com.google.mlkit.vision.barcode.common.Barcode;
import com.google.mlkit.vision.common.InputImage;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ActivityACamaraEscaner extends AppCompatActivity {

    private ListenableFuture camaraProviderFuture;
    private ExecutorService camaraExecutor;
    private PreviewView previewView;
    private ImageAnalyzer analyzer;
    private String codigosBarras = "";
    private Button btnIngresarManualmente;
    private Button btnCancelar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_acamara_escaner);
        previewView = (PreviewView) findViewById(R.id.previewview);
        btnIngresarManualmente = (Button) findViewById(R.id.ACamaraLector_btn_ingresar_manualmente);
        btnCancelar = (Button) findViewById(R.id.ACamaraLector_btn_cancelar);


        this.getWindow().setFlags(1024, 1024);

        camaraExecutor = Executors.newSingleThreadExecutor();
        camaraProviderFuture = (ListenableFuture) ProcessCameraProvider.getInstance(this);
        analyzer = new ImageAnalyzer(getSupportFragmentManager());

        // Hilo para actualizar la capa
        camaraProviderFuture.addListener(new Runnable(){
            @Override
            public void run() {
                try {
                    if(ContextCompat.checkSelfPermission(ActivityACamaraEscaner.this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED)
                    {
                        ProcessCameraProvider processCameraProvider = (ProcessCameraProvider)  camaraProviderFuture.get();
                        bindPreview(processCameraProvider);
                    }
                    else
                    if(ActivityCompat.checkSelfPermission(ActivityACamaraEscaner.this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED)
                    {
                        ActivityCompat.requestPermissions(ActivityACamaraEscaner.this, new String[]{ Manifest.permission.CAMERA }, 101);
                    }
                    else{
                        devolverRespuestaActivity(EMensajes.CANCELADO, EResultados.CANCELADO.obtenerValor(), "codigos_barras", "Permisos no concedidos");
                    }
                }
                catch (Exception ex){
                    devolverRespuestaActivity(EMensajes.ERROR, EResultados.ERROR.obtenerValor(), "codigos_barras", ex.getMessage());
                }
            }

        }, ContextCompat.getMainExecutor(this));

        btnIngresarManualmente.setOnClickListener(view -> {
            devolverRespuestaActivity(EMensajes.EVENTO, EResultados.EVENTO.obtenerValor(), "codigos_barras", "Ingresar manualmente");
        });

        btnCancelar.setOnClickListener(view -> {
            devolverRespuestaActivity(EMensajes.CANCELADO, EResultados.CANCELADO.obtenerValor(), "codigos_barras", "Cancelar");
        });
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if ((requestCode == 101) && (grantResults.length > 0)) {
            ProcessCameraProvider processCameraProvider = null;
            try {
                processCameraProvider = (ProcessCameraProvider) camaraProviderFuture.get();
            } catch (ExecutionException e) {
                devolverRespuestaActivity(EMensajes.ERROR, EResultados.ERROR.obtenerValor(), "codigos_barras", e.getMessage());
            } catch (InterruptedException e) {
                devolverRespuestaActivity(EMensajes.ERROR, EResultados.ERROR.obtenerValor(), "codigos_barras", e.getMessage());
            }
            bindPreview(processCameraProvider);
        }
        else{
            devolverRespuestaActivity(EMensajes.CANCELADO, EResultados.CANCELADO.obtenerValor(), "codigos_barras", "");
        }
    }

    private class ImageAnalyzer implements ImageAnalysis.Analyzer {
        private FragmentManager fragmentManager;

        public ImageAnalyzer(FragmentManager fragmentManager){
            this.fragmentManager = fragmentManager;
        }

        @Override
        public void analyze(@NonNull ImageProxy image) {
            scanBarCode(image);
        }
    }

    private void scanBarCode(ImageProxy imagen){
        @SuppressLint("UnsafeOptInUsageError") Image imagen1 = imagen.getImage();
        InputImage inputImage = InputImage.fromMediaImage(imagen1, imagen.getImageInfo().getRotationDegrees());
        BarcodeScannerOptions options =
                new BarcodeScannerOptions.Builder()
                        .setBarcodeFormats(
                                Barcode.FORMAT_ALL_FORMATS)
                        .build();

        BarcodeScanner scanner = BarcodeScanning.getClient();

        Task<List<Barcode>> result = scanner.process(inputImage)
                .addOnSuccessListener(new OnSuccessListener<List<Barcode>>() {
                    @RequiresApi(api = Build.VERSION_CODES.N)
                    @Override
                    public void onSuccess(List<Barcode> barcodes) {
                        // Task completed successfully
                        // ...
                        readerBarCodeData(barcodes);
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        devolverRespuestaActivity(EMensajes.ERROR, EResultados.ERROR.obtenerValor(), "codigos_barras", "");
                    }
                })
                .addOnCompleteListener(new OnCompleteListener<List<Barcode>>() {
                    @Override
                    public void onComplete(@NonNull Task<List<Barcode>> task) {
                        imagen.close();
                    }
                });
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    private void readerBarCodeData(List<Barcode> barcodes) {

        this.codigosBarras = "";

        for (Barcode barcode: barcodes) {
            /*Rect bounds = barcode.getBoundingBox();
            Point[] corners = barcode.getCornerPoints();

            String rawValue = barcode.getRawValue();

            int valueType = barcode.getValueType();
            // See API reference for complete list of supported types
            switch (valueType) {
                case Barcode.TYPE_WIFI:
                    String ssid = barcode.getWifi().getSsid();
                    String password = barcode.getWifi().getPassword();
                    int type = barcode.getWifi().getEncryptionType();
                    break;
                case Barcode.TYPE_URL:
                    String title = barcode.getUrl().getTitle();
                    String url = barcode.getUrl().getUrl();
                    break;
            }*/

            this.codigosBarras += barcode.getRawValue() + "|" + this.codigosBarras;
        }

        if(this.codigosBarras != ""){
            devolverRespuestaActivity(EMensajes.ACERTADO, EResultados.ACERTADO.obtenerValor(), "codigos_barras", this.codigosBarras);
        }
    }

    private void bindPreview(ProcessCameraProvider processCameraProvider) {
        Preview preview = new Preview.Builder().build();
        CameraSelector cameraSelector = new CameraSelector.Builder().requireLensFacing(CameraSelector.LENS_FACING_BACK).build();
        preview.setSurfaceProvider(previewView.getSurfaceProvider());
        ImageCapture imageCapture = new ImageCapture.Builder().build();
        ImageAnalysis imageAnalysis = new ImageAnalysis.Builder()
                .setTargetResolution(new Size(1280, 720))
                .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                .build();
        imageAnalysis.setAnalyzer(camaraExecutor, analyzer);
        processCameraProvider.unbindAll();
        processCameraProvider.bindToLifecycle(this, cameraSelector, preview, imageCapture, imageAnalysis);
    }

    /**
     * Esta función prepara el Activity para devolver una respuesta
     * luego de preparar la respuesta cierra el activity
     * @param {EMensajes} eMensaje Estado de respuesta personalizado
     * @param {int} CodigoResultado @example RESULT_OK
     * @param {String} llave Esta variable va al putExtra
     * @param {String} datos se agregar al mensaje
     */
    private void devolverRespuestaActivity(EMensajes eMensaje, int CodigoResultado, String llave, String datos){
        getIntent().putExtra(llave, datos);
        setResult(CodigoResultado, getIntent());
        finish();
    }
}