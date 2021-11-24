package com.mypackage.name;

// Import necessary libraries
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.webkit.WebSettingsCompat;
import androidx.webkit.WebViewFeature;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Build;
import android.os.Bundle;
import android.os.Process;
import android.view.View;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;

// Debug
import android.util.Log;
import android.webkit.WebViewClient;

// Manage the WebView client and look for any errors
class CustomWebViewClient extends WebViewClient {

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {

        // Check if this is the store's domain
        if ("store.mur-lang.org".equals(request.getUrl().getHost()) || "accounts.mur-lang.org".equals(request.getUrl().getHost())) {

            // This is my website, so do not override this request.
            return false;

        }else{

            // Otherwise, the link is not for a page on my site, so launch another Activity that handles URLs
            // Intent intent = new Intent(Intent.ACTION_VIEW, request.getUrl());
            // startActivity(intent);

            return true;

        }

    }

}

public class MainActivity extends AppCompatActivity {

    // Define some class-level variables
    int statusBarHeight,
        currentAppVersionCode = -15;
    WebView contentWebView;

    // Update the status bar height variable
    public void updateStatusBarHeight(){

        // Reset the status bar height
        statusBarHeight = 0;

        int resourceId = getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {

            statusBarHeight = getResources().getDimensionPixelSize(resourceId);

        }

    }

    // Update the layout to fit the whole screen
    public void updateLayout(){

        // Display content under the status bar
        View appView = getWindow().getDecorView();
        appView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN);

    }

    // Setup the WebView (for more info, visit: https://developer.android.com/guide/webapps/webview#java)
    public void setupWebView(){

        // Get the WebView element from the "activity_main.xml" file
        contentWebView = findViewById(R.id.ContentWebView);

        // Hide the WebView
        contentWebView.setVisibility(View.INVISIBLE);

        // Manage the settings of the WebView
        WebSettings contentWebViewSettings = contentWebView.getSettings();
        contentWebViewSettings.setJavaScriptEnabled(true);
        contentWebViewSettings.setDomStorageEnabled(true);
        contentWebViewSettings.setBuiltInZoomControls(false);
        contentWebViewSettings.setSupportMultipleWindows(true); // Use this to allow the users to sign in to their accounts!

        // Improve the performance of the WebView
        contentWebView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        contentWebViewSettings.setRenderPriority(WebSettings.RenderPriority.HIGH);
        contentWebViewSettings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        contentWebViewSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NARROW_COLUMNS);
        contentWebViewSettings.setUseWideViewPort(true);
        contentWebViewSettings.setSaveFormData(false);

        // Link the required APIs for the app to work
        contentWebView.addJavascriptInterface(MainActivity.this, "androidAPIs");

        // Get microphone permissions
        // ?????

        // Manage links and redirecting
        contentWebView.setWebViewClient(new CustomWebViewClient());
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

    }

    // Show the WebView
    public void showWebView(){

        // Change the visibility of the WebView
        contentWebView.setVisibility(View.VISIBLE);

    }

    // Define the main function
    // For more info about these events: https://developer.android.com/guide/components/activities/activity-lifecycle
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        // Default code
        super.onCreate(savedInstanceState);

        // Give the app a high priority
        int tidId = android.os.Process.myTid();
        Log.d("00000000000","priority before change = " + android.os.Process.getThreadPriority(tidId));
        Log.d("00000000000","priority before change = "+Thread.currentThread().getPriority());
        android.os.Process.setThreadPriority(Process.THREAD_PRIORITY_URGENT_DISPLAY);
        Log.d("00000000000","priority after change = " + android.os.Process.getThreadPriority(tidId));
        Log.d("00000000000","priority after change = " + Thread.currentThread().getPriority());


        // Hide the title bar and action bar
        updateLayout();
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getSupportActionBar().hide();

        // Set the content view to the activity_main.xml file
        setContentView(R.layout.activity_main);

        updateStatusBarHeight();
        setupWebView();

        // Load the website (temp)
        contentWebView.loadUrl("https://store.mur-lang.org/page/home/?androidAppVersion=" + currentAppVersionCode);

    }

    @Override
    public void onDestroy() {

        // Default code
        super.onDestroy();

        // Remove the WebView
        contentWebView.clearHistory();
        contentWebView.removeAllViews();
        contentWebView.destroy();

    }
    @Override
    public void onBackPressed() {

        if(contentWebView.canGoBack()) {

            contentWebView.goBack();

        } else {

            super.onBackPressed();

        }

    }

    // @Override
    // public void onNightModeChanged(@AppCompatDelegate.NightMode int mode) {
    //
    //     super.onNightModeChanged(mode);
    //
    // }

    // Define all the "androidAPI" JS functions here!

    // A function that returns the status bar height (px)
    @JavascriptInterface
    public int getStatusBarHeight() {

        return statusBarHeight;

    }

    // A function that tells the website if the system is using dark mode
    @JavascriptInterface
    public boolean isUsingDarkMode(){

        int nightModeFlags = getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;

        return nightModeFlags == Configuration.UI_MODE_NIGHT_YES;

    }

    // A function that the website can use to tell the app that it's finished loading
    @JavascriptInterface
    public void layoutDoneLoading(){

        // Show the WebView
        runOnUiThread(new Runnable() {

            @Override
            public void run() {

                showWebView();

            }

        });

    }

}