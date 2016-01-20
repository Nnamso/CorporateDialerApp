// helper function to extract the first name from the grammar result
function extractFirstName(rhsGrammar) {
    // fn:michael@work
    return rhsGrammar.split('@')[0].substr(3);
}

//
function buildModNamesDarbyURL(type, name, prosity) {
    var properNameURL = "http://audio.en-us.tellme.com/mod-names-darby/" + type + "/";
    if ("first" == type || "last" == type) {
        properNameURL += name.substring(0,1).toLowerCase() + "/";
        properNameURL += name.substring(0,2).toLowerCase() + "/";
        properNameURL += name.toLowerCase() + "-" + prosity + ".wav";
    }
    return properNameURL;
}

// The first name audio generation was split out because it is also used by CBC
function getFirstNameAudioArray(rhsGrammar) {
    var aAudio = new Array();
    var fname = extractFirstName(rhsGrammar);
    aAudio.push(audioObj(buildModNamesDarbyURL("first", fname, "u"), fname, "50"));
    return aAudio;
}

// [John Smith]
function Prompt_a42abdf28fe6156c10f86708e9f6808f() {
    // Nesting Level: 1
    // Required audio objects: 3 - the number of levels + the max number of terms in the variable audio

    var aAudio = new Array();
    var username  = appoUser.username[0].text___;
    var firstname = appoUser.firstname[0].text___;
    var lastname  = appoUser.lastname[0].text___;

    aAudio.push(audioObj(appsEmployeeNamesAudio + username  + ".wav", "", "150"));
    aAudio.push(audioObj(buildModNamesDarbyURL("first", firstname, "u"), firstname, "50"));
    aAudio.push(audioObj(buildModNamesDarbyURL("last", lastname, "d"), lastname, "50"));
    return aAudio;
}

// [on the mobile phone]
function Prompt_f413aac8525f55ae0057e0be1500da9e() {
    var aAudio = new Array();
    if ("mobile" == appsFilled_select_phone) {
    	aAudio.push(audioObj(appsAudioRootPath + "40689a8bafd76c3449b5a768b4f0fada.wav", "on the mobile phone", "150"));
    } else if ("work" == appsFilled_select_phone) {
    	aAudio.push(audioObj(appsAudioRootPath + "74cca28d087bf0e5f5a2a81ce4d5230f.wav", "on the work phone", "150"));
    } else if ("home" == appsFilled_select_phone) {
    	aAudio.push(audioObj(appsAudioRootPath + "0bd4959fa02757fdad368cc76fe7d7fa.wav", "on the home phone", "150"));
    }
    return aAudio;
}

// [first name]
function Prompt_84e5cd520ab45726c2d72d18caddc9d8() {
    return getFirstNameAudioArray(appsFilled_get_name);
}

// [last name list]
function Prompt_4076483c4009fe055df69b87088a5230() {
    var aAudio = new Array();
    var len = appoAPI_get_first_name_list.users[0].user.length;
    for (var cnt = 0; cnt < len; cnt++) {
        var lastname  = appoAPI_get_first_name_list.users[0].user[cnt].lastname[0].text___;
        aAudio.push(audioObj(buildModNamesDarbyURL("last", lastname, "d"), lastname, "150"));
    }
    return aAudio;
}

// [Good morning]
function Prompt_f9ba306061f9b19acb43fc02f74bc52b() {
    var aAudio = new Array();
    var date = new Date();
    var hour = date.getHours();

    if (hour >= 12 && hour < 18) {
    	aAudio.push(audioObj(appsAudioRootPath + "e0466094b1cd89703b0b259d3ec5c9e8.wav", "good afternoon", "200"));
    } else if (hour >= 18 && hour <= 23 ){
    	aAudio.push(audioObj(appsAudioRootPath + "0fa14c6f02392c5bcaaaa979552de664.wav", "good evening", "200"));
    } else {
    	aAudio.push(audioObj(appsAudioRootPath + "2b849500e4585dab4196ec9a415edf8f.wav", "good morning", "200"));
    }
    return aAudio;
}

// [Who would you like to speak with]
function Prompt_934b72a35b2895a95cebddf16f854c28() {
    var aAudio = new Array();
    if (appoUser == null) {
    	aAudio.push(audioObj(appsAudioRootPath + "1c3efdf17ab21629b2115d0034e711d9.wav", "Who would you like to speak with?", "150"));
    } else  {
    	aAudio.push(audioObj(appsAudioRootPath + "c77f7d089535161a3a179d68c60b57b9.wav", "If you would like to speak with someone else please say their first or full name.", "150"));
    }
    return aAudio;
}

// [has a work, mobile, and home listing]
function Prompt_4234212b8e48452767813fdf8a6efda2() {
    var aAudio = new Array();
    var mobile = appoUser.mobile[0].text___ || "";
    var home = appoUser.home[0].text___ || "";

    if (mobile.length > 0 && 0 == home.length) {
    	aAudio.push(audioObj(appsAudioRootPath + "e7037abd1fc4b52f4866813d5c5a191a.wav", "has a work and mobile listing", "150"));
    } else if (home.length > 0 && 0 == mobile.length) {
    	aAudio.push(audioObj(appsAudioRootPath + "e393a1b2a77f55973e524b5d59af35c3.wav", "has a work and home listing", "150"));
    } else {
    	aAudio.push(audioObj(appsAudioRootPath + "d7ddb10f167989c7ed5d8f396034b262.wav", "has a work, mobile, and home listing", "150"));
    }
    return aAudio;
}

// [John or John Smith]
function Prompt_ec34238fd27fcb224a0d5b1dd37f634d() {
    var aAudio = new Array();
    if ("fn:" == appoCBCCandidate.interpretation.substr(0,3))
    {
        return getFirstNameAudioArray(appoCBCCandidate.interpretation);
    
    } else {
        var username = appoCBCCandidate.interpretation.split('@')[0];
        aAudio.push(audioObj(appsEmployeeNamesAudio + username  + ".wav", appoCBCCandidate.utterance, "150"));
    }
    return aAudio;
}

// [transfer instruction and delay]
function Prompt_712a90e6d4bb753ec4670cb344f18d0e() {
    var aAudio = new Array();
    aAudio.push(audioObj(appsAudioRootPath + "2b0ec4dca82e5e2e158e2095ff115eb2.wav", "say stop to cancel.", "0"));
    aAudio.push(audioObj("http://audio.en-US.tellme.com/common-audio/intellipause.wav", "", "0"));
    return aAudio;
}




