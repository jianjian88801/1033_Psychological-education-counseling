const base = {
    get() {
                return {
            url : "http://localhost:8080/springboot7w3d0/",
            name: "springboot7w3d0",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/springboot7w3d0/front/index.html'
        };
            },
    getProjectName(){
        return {
            projectName: "高校心理教育辅导"
        } 
    }
}
export default base
