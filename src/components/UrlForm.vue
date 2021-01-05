<template>
    <section>
        <md-card>
            <md-card-header>
                <div class="md-title">Shortening URLs</div>
            </md-card-header>
            <md-card-content>
                <form class="md-layout">
                    <md-field>
                        <label>Long link</label>
                        <md-input v-model="link" md-counter="30"></md-input>
                    </md-field>
                    <md-button @click="makeLinkShort()" class="md-raised  md-primary">make this link short</md-button>

                    <p v-if="link.length > 5 && !validate()">
                        <md-icon>error</md-icon> invalid URL
                    </p>

                    <code>{{shortLink}}</code>
                    <input ref="linkblock" style="display: none !important;" v-model="shortLink"/>
                    <md-button v-on="event">Save & Copy 
                        <md-icon>content_copy</md-icon>
                    </md-button>
                </form>
          </md-card-content>
        </md-card>
    </section>
</template>

<script>

import {javaHashCode, linkRegex, saveLinkOnBackend, copyText} from '../utils'

const HOST_URL = 'http://short.url/'

export default {
    name: 'UrlForm',
    data(){
        return {
            link: '',
            alowedToCopy: false,
            shortLink: '',
            event: {
                click: this.copyShortUrl
            }
        }
    },
    mounted(){
        navigator.permissions.query({name: "clipboard-write"}).then(result => {
            if (result.state == "granted" || result.state == "prompt") {
                //can write to the clipboard now 
                this.alowedToCopy = true
            }
            });
    },
    methods: {
        makeLinkShort(){
            if(this.validate()) {
                this.shortLink = `${HOST_URL}${javaHashCode(this.link)}`
            }
        },
        validate(){
            return this.link.length > 5 && this.link.match(linkRegex)
        },
        copyShortUrl(event){
            if(! this.alowedToCopy) return;

            // copyText(this.$refs.linkblock)
            
            navigator.clipboard.writeText(this.shortLink)
            
            //saveLinkOnBackend(this.shortLink)
            
            this.link = ''
        }
    }
}
</script>

<style>
    section {
        width: 300px;
        margin: 0 auto;
    }
    button, code {
            width: 100%;
    }
    code {
    padding: 20px 10px;
    border-radius: 2px;
    }
</style>