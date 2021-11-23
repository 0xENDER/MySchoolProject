package com.mypackage.name;

// Import necessary libraries
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;

// Debug
import android.util.Log;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;


public class MainActivity extends AppCompatActivity {

    int statusBarHeight,
        currentAppVersionCode = -3;

    // Define the main function
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        // Default code
        super.onCreate(savedInstanceState);

        // Get the height of the status bar (Not working!!!)
        statusBarHeight = 0;
        int resourceId = getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {

            // Convert the value from "dimen" to "px"
            statusBarHeight = getResources().getDimensionPixelSize(resourceId);

        }

        // Hide the title bar and action bar
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getSupportActionBar().hide();

        // Display content under the status bar
        View appView = getWindow().getDecorView();
        appView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);

        // Set the content view to the activity_main.xml file
        setContentView(R.layout.activity_main);

        // Get the WebView element from the "activity_main.xml" file
        WebView contentWebView = findViewById(R.id.ContentWebView);

        // Manage the settings of the WebView
        WebSettings contentWebViewSettings = contentWebView.getSettings();
        contentWebViewSettings.setJavaScriptEnabled(true);
        contentWebViewSettings.setDomStorageEnabled(true);
        contentWebViewSettings.setAppCacheEnabled(false);
        contentWebViewSettings.setCacheMode(WebSettings.LOAD_NO_CACHE);

        // Link the required APIs for the app to work
        contentWebView.addJavascriptInterface(MainActivity.this, "androidAPIs");

        // Get the console messages (debug)
        contentWebView.setWebChromeClient(new WebChromeClient() {
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

    // A function that returns the status bar height (px)
    @JavascriptInterface
    public int getStatusBarHeight() {

        return statusBarHeight;

    }

}