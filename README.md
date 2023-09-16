# Potable is an app that shows you where drinkable water is

## Do you know where your next drink will come from?

This is a project to enable people around the world to document their sources of water.

Climate change, industrial development, economic inequality all contribute to unequal access to the most important resource on the planet.

## Movement Goals

-   Document all public water sources in SF, then the US, then North America, then the World, then Mars... if applicable.

## App Specific Goals

-   Distribute on App Store
-   Distribute on Play Store

## Steps

-   ~~Let users add water sources that they use or find while traveling.~~
-   Connect public resources (water analytics) from local sources.

## Technologies Used

### Core Infra

https://docs.expo.dev/versions/latest/

### React Native Libraries

##### React Native Bottom Sheet

https://gorhom.github.io/react-native-bottom-sheet/

##### React Native Maps

https://github.com/react-native-maps/react-native-maps

##### React Native Paper (Material Design)

https://reactnativepaper.com/

##### React Native Reanimated

https://docs.swmansion.com/react-native-reanimated/

##### React Native Gesture Handler

https://docs.swmansion.com/react-native-gesture-handler/

### Style Guide

1. We have one modal and its content is variable in state.
2. We use `useSelector` to access selectors in components.
3.

### Documentation

#### Codebase

##### Components

Marker
Map
Modals

-   Login
-   Signup
-   Marker Info
-

###### Screens

Main

-   Dashboard Init - Requests location on load
    -   Selected Marker
        On Select: Zooms half way - Centers marker in screen - Basic information modal
        On Details: Zooms close, in center of map view above modal
        Picture View: Modal opens to show full size picture

###### State - Redux

App

-   DeviceLocationPermissions
-   UploadProgress:
    Error
-   Message: String
    Markers
-   Entities: []MarkerObject
-   SelectedMarker: MarkerObject
-   Location: LocationObject
-   Loading: Boolean
-   TempMarker: MarkerObject
    Modal
-   Screen: String
    User
-   isLoggedIn
    -   Boolean
-   email
    -   String

###### Marker Types & Interactions

-   Marker: Location Information
    Rating: []Rating
    Type: Water Fountain | Spring | Tap | Other
    Additional Info: Dog Bowl | Bottle Filling Station | Other
    Date Added/Verified: Date | User ID
    Added By: User ID
    Notes

-   Selected Marker

-   Temp Marker - On Map Press or Add Button Press - Selection ring appears - Screen Zooms 75% of the way, centers selection ring - Modal appears at bottom of screen instructing users to long press and drag to move marker - CTA appears to continue to next screen - On press, camera screen appears to take a picture - Confirm or retake - Confirm goes to add marker info screen - On Save, becomes selected marker - On Add Button Press
    zoom: true | false

-   Favorite Markers

#### Code Structure

#### Notes
