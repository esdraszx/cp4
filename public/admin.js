var app = new Vue({
    el: '#app',
    data: {
        rows: [],
        username: '',
    },
    created(){
        this.getAllUsers()
    },
    methods: {
        async getAllUsers (){
            try {
                let response = await axios.get('/api/getAllUsers');
                this.rows = response.data;
            }
            catch(e){
                console.log(e)
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
        async saveAll(){    
                console.log(this.rows)
            try {
                let response = await axios.put('/api/saveAll/' + this.username, {
                    items: this.rows,
                });
                if (response.data === 'SAVED'){
                    alert(response.data)
                }
                else {
                    alert('SOMETHING WENT WRONG!')
                }
            }
            catch(e){
                console.log(e)
            }
            if (this.username === ''){
                this.getAllUsers()
            }
            else {
                this.getAll()
            }
            
            
        },
        async deleteItem(_id){
            let r = confirm("DO YOU WANT TO DELETE THIS ITEM?");
            if (r == true) {
                try {
                    let response = await axios.delete('/api/delete/' + _id);
                    if (response.data === 'DELETED'){
                        alert(response.data)
                    }
                    else {
                        alert('SOMETHING WENT WRONG!')
                    }
                }
                catch (e){
                    console.log(e)
                }
            } else {
                console.log('cancel')
            }
            this.getAllUsers()
        },
    },
});