package com.mypackage.name;

// Import necessary libraries
import androidx.appcompat.app.AppCompatActivity;

import android.content.res.TypedArray;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;

// Debug
import android.util.Log;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {

    int statusBarHeight,
        currentAppVersionCode = -5;
    WebView contentWebView;

    // Define the main function
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        // Default code
        super.onCreate(savedInstanceState);

        // Hide the title bar and action bar
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getSupportActionBar().hide();

        // Get the height of the status bar (Not working!!!?aS?aD?aD?as/a?!!!!!)
        statusBarHeight = 0;
        int statusBarHeightResourceId = getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (statusBarHeightResourceId > 0) {

            // Convert the value from "dimen" to "px"
            statusBarHeight = Math.round(getResources().getDimension(statusBarHeightResourceId));

        }

        // Display content under the status bar
        View appView = getWindow().getDecorView();
        appView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);

        // Set the content view to the activity_main.xml file
        setContentView(R.layout.activity_main);

        // Get the WebView element from the "activity_main.xml" file
        contentWebView = findViewById(R.id.ContentWebView);

        // Manage the settings of the WebView
        WebSettings contentWebViewSettings = contentWebView.getSettings();
        contentWebViewSettings.setJavaScriptEnabled(true);
        contentWebViewSettings.setDomStorageEnabled(true);
        contentWebViewSettings.setAppCacheEnabled(false);
        contentWebViewSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);

        // Link the required APIs for the app to work
        contentWebView.addJavascriptInterface(MainActivity.this, "androidAPIs");

        // Get microphone permissions
        // ?????

        // Force links and redirects to open in the WebView instead of in a browser
        // contentWebView.setWebViewClient(new WebViewClient());

        // Get the console messages (debug)
        contentWebView.setWebChromeClient(new WebChromeClient() {

            @Override
            public void onPermissionRequest(final PermissionRequest request) {

                request.grant(request.getResources());

            }

            // Debug
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.e("MyApplication", consoleMessage.message() + " -- From line " +
                        consoleMessage.lineNumber() + " of " + consoleMessage.sourceId());
                return true;
            }

        });

        // Load the website (temp)
        contentWebView.loadUrl("https://store.mur-lang.org/page/home/?androidAppVersion=" + currentAppVersionCode);

    }

    @Override
    public void onBackPressed() {

        if(contentWebView.canGoBack()) {

            contentWebView.goBack();

        } else {

            super.onBackPressed();

        }

    }
    // A function that returns the status bar height (px)
    @JavascriptInterface
    public int getStatusBarHeight() {

        return statusBarHeight;

    }

}