开发环境查不到数据：
1、开发环境使用的查询表是：team_members，线上实际是 team.members
    export const TeamCollectionName = ‘teams’；
    export const TeamMemberCollectionName = ‘team_members’；
    export const TeamTagsCollectionName = ‘team_tags’；

解决方法：
    1。将 team_members 表中的数据 team_id 改为线上的 team_id
    2。切换分支到 v4.8

    

聊天界面： 
    projects\app\src\components\ChatBox\index.tsx



优化引用弹出窗文字排版为 md 格式：
projects\app\src\components\core\dataset\QuoteItem.tsx
·
    <Box flex={‘1 0 0’}>
        <Box color={‘black’} fontFamily={‘Arial’}> 
        <Markdown
        source={quoteItem.q}
        showAnimation={false}
        />  
</Box>
        <Box color={‘myGray.600’}>{quoteItem.a}</Box>
    </Box>
·

安装依赖
pnpm i

开发运行
projects/app 
cd

pnpm dev

docker build -f Dockerfile -t huanghanzzz/fastgpt/fastgpt:v4.8.1。 --build-arg name=app
docker push huanghanzzz/fastgpt/fastgpt:v4.8.1