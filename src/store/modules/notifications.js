import api from '@/api/';

export default {
    namespaced: true,
    state () {
        return {
            notifications: [],
        }
    },
    getters: {
        getNotifications: stateFreezed => stateFreezed.notifications,
    },
    actions: {
        async GET_NOTIFICATIONS ({ commit }) {
            const response = await api.get('/api/new_comments/');
            commit('SET_NOTIFICATIONS', response.data)
        },
        async SEND_SCORE_NOTIFICATION(context, comment){
            console.log(comment)
            try{
                const data = new FormData();
                if(comment.type == 'comment')
                {
                    data.append("comment", comment.id)
                    data.append("score", comment.rating)
                    await api.post("/api/score_comment/", data)
                    await api.post('/api/mark_comment_seen/', data)
                    context.dispatch("GET_NOTIFICATIONS");
                }
                else
                {   
                    if(comment.type == 'character_comment')
                    {
                        data.append("character_comment", comment.id)
                   
                        await api.post('/api/mark_comment_seen/', data)
                        context.dispatch("GET_NOTIFICATIONS");
                    }
                    else
                    {
                        data.append("character_comment_expert", comment.id)
                   
                        await api.post('/api/mark_comment_seen/', data)
                        context.dispatch("GET_NOTIFICATIONS");
                    }
                    
                }

                
            }catch(error){
                console.log(error)
            }

            
        }
    },
    mutations: {
        SET_NOTIFICATIONS (state, response) {
            state.notifications = response;
        }
    }
}