var app = new Vue({
    el: '#app',
    data: {
        rows: [],
        lastAdded: [],
        lastAddedOut: [],
        username: '',
        date: '',
    },
    created(){
        this.getTime()
        this.getDate()
    },
    methods: {
        async getTime(){
            setInterval (function(){
                const time = new Date();
                document.getElementById('clock').value = time.toLocaleTimeString();
            }, 1000);
        },
        async getDate(){
            let currentDate = new Date();
            let dateFormat = currentDate.toDateString();
            this.date = dateFormat;
        },
        async submitIn(){//GET ITEMS FROM DB THEN DO THE COMPARISON
            
            if (this.username === ''){
                alert('ENTER USERNAME FOR CLOCK IN')
                console.log('found undefined')
            }
            else {
                try {
                    
                    let inTime = document.getElementById('clock').value;
                    let response = await axios.post("/api/clockIn/" + inTime, {
                        date: this.date,
                        username: this.username
                    })
                    this.lastAdded = JSON.stringify(response.data);
                    console.log(this.lastAdded);
                    if (this.lastAdded === '"CLOCKED IN"'){
                        alert(this.lastAdded)
                        this.getAll();
                    }
                    else {
                        alert('ERROR')
                    }
                }catch (error){
                    console.log(error)
                }
            }
            this.username = ''
            
        },
        async submitOut(){
            if (this.username === ''){
                alert('ENTER USERNAME FOR CLOCK OUT')
                console.log('found undefined')
            }
            else {
                try {
                    let inTime = document.getElementById('clock').value;
                    let response = await axios.put("/api/clockOut/" + inTime, {
                        date: this.date,
                        username: this.username
                    })
                    this.lastAddedOut = JSON.stringify(response.data);
                    if (this.lastAddedOut === '"CLOCK OUT NOT FOUND. Contact you supervisor"'){
                        alert(this.lastAddedOut)
                    }
                    else {
                        alert('CLOCKED OUT')
                        this.getAll();
                    }
                }catch (error){
                    console.log(error)
                }
            }
            this.username = ''
            
        },
        async getAll (){
            try {
                let response = await axios.get('/api/getAll/' + this.username);
                this.rows = response.data;
            }
            catch(e){
                console.log(e)
            }
        },

    },
});