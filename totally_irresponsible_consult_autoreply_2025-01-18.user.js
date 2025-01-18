// ==UserScript==
// @name         Totally irresponsible consult autoreply (TICA)
// @namespace    http://tampermonkey.net/
// @version      2025-01-18
// @description  Shit consults deserve shit replies...
// @author       Just Another Rheumatologist
// @match        file:///*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Create input boxes for user to put model name, API key, and prompt
    const llm_list = document.createElement("dl");

    const llm_list_title_header = document.createElement("dt");
    const llm_list_title = document.createTextNode("OpenWebUI inputs");
    llm_list_title_header.appendChild(llm_list_title);

    // Endpoint for completions should look like http://localhost:3000/api/chat/completions, per OpenWebUI docs
    // (https://docs.openwebui.com/getting-started/advanced-topics/api-endpoints/)
    const llm_endpoint_li = document.createElement("dd");
    const llm_endpoint_textentry = document.createElement("input");
    llm_endpoint_textentry.setAttribute("id", "endpoint");
    llm_endpoint_textentry.setAttribute("type", "text");
    llm_endpoint_textentry.setAttribute("size", "80");
    llm_endpoint_textentry.setAttribute("placeholder", "OpenWebUI endpoint here");

    const llm_model_li = document.createElement("dd");
    const llm_model_textentry = document.createElement("input");
    llm_model_textentry.setAttribute("id", "modelname");
    llm_model_textentry.setAttribute("type", "text");
    llm_model_textentry.setAttribute("placeholder", "Model name here");
    llm_model_textentry.setAttribute("value", "llama3.3:70b");

    const llm_apitoken_li = document.createElement("dd");
    const llm_apitoken_textentry = document.createElement("input");
    llm_apitoken_textentry.setAttribute("id", "authtoken");
    llm_apitoken_textentry.setAttribute("type", "text");
    llm_apitoken_textentry.setAttribute("size", "160");
    llm_apitoken_textentry.setAttribute("placeholder", "Your authentication token here");

    const llm_prompt_li = document.createElement("dd");
    const llm_prompt_textentry = document.createElement("textarea");
    llm_prompt_textentry.setAttribute("id", "userprompt");
    llm_prompt_textentry.setAttribute("rows", "20");
    llm_prompt_textentry.setAttribute("cols", "80");
    const llm_prompt = document.createTextNode(`You are a rheumatologist in southern Taiwan in charge of giving replies to rheumatology-related consults.
You will be given a consult. Please try to reply using the following sectioned format, with your responses indicated by the placeholder {REPLY}:

[Patient condition]
{REPLY}
[Reason for consult]
{REPLY}
[Impression]
{REPLY}
[Suggestions]
{REPLY}

Autoimmune testing available at this facility include the CTD or ENA panels from EuroImmune, rheumatoid factor (listed as RAfactor here),
C3, C4, antinuclear antibody titer and stain pattern, IgG, IgA, IgM, IgE, MPO ANCA, PR3 ANCA, antimitochondrial antibody, anti-smooth muscle antibody,
scleroderma panel, inflammatory myositis panel, and anti-aquaporin 4 (anti-AQP4) antibody. The usual hemograms, differential counts, serum biochemistry,
and urine biochemistry and urinalysis can also be ordered. CT and MRI can also be ordered if needed.
Please take this into consideration when giving replies. Also, please note the possibility that the consult is not related to rheumatology at all.

The Suggestions section should be presented as a bulleted list, with each point indicated using a hyphen.
Replace the {REPLY} tags with your replies themselves. Try to be brief.

This is the consult in question, in quotes. Please try to reply to the best of your capabilities.
If you have any uncertainties at all, please describe them at the end of your response.`);
    llm_prompt_textentry.appendChild(llm_prompt);

    llm_endpoint_li.appendChild(llm_endpoint_textentry);
    llm_model_li.appendChild(llm_model_textentry);
    llm_apitoken_li.appendChild(llm_apitoken_textentry);
    llm_prompt_li.appendChild(llm_prompt_textentry);

    llm_list.appendChild(llm_list_title_header);
    llm_list.appendChild(llm_endpoint_li);
    llm_list.appendChild(llm_model_li);
    llm_list.appendChild(llm_apitoken_li);
    llm_list.appendChild(llm_prompt_li);

    // Create button to send stuff to OpenWebUI
    const llm_submit = document.createElement("button");
    llm_submit.addEventListener("click", function(){
        // Get stuff from the user inputs
        const modelname = document.getElementById("modelname").value;
        const auth = "Bearer " + document.getElementById("authtoken").value;

        // Actual element ID for consult: send_textarea (replace document.getElementById("consult") with document.getElementById("send_textarea"))
        // Actual element ID for reply: reply_textarea (replace document.getElementById("reply") with document.getElementById("reply_textarea"))
        fetch(document.getElementById("endpoint").value,
            {
            method: "POST",
            body: JSON.stringify({
                "model": modelname,
                "messages": [
                    {
                        "role": "user",
                        "content": document.getElementById("userprompt").value + "\n\n" + document.getElementById("consult").value
                    }
                ]
            }),
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((reply) => {document.getElementById("reply").value = reply.choices[0].message.content;});

    });

    const llm_submit_text = document.createTextNode("Generate");
    llm_submit.appendChild(llm_submit_text);

    // Actual element ID for reply: reply_textarea (replace document.getElementById("reply") with document.getElementById("reply_textarea"))
    const reply = document.getElementById("reply");
    reply.parentNode.insertBefore(llm_submit, reply.nextSibling);
    reply.parentNode.insertBefore(llm_list, reply.nextSibling);
})();