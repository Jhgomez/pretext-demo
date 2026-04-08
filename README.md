# Environment Setup
1. Create a VM, in WIndows 11 use Hyper-V instead of SandBox because the latter doesn't allow to use apps like git or a proxy
2. I created an Ubuntu VM, so the first thing to do when is up is to update the versions of each of the packages in the packages list 
in the "Advance Package Tool"(`apt-get`), we also have the option to use a more user friendly package tool(`apt`), however the former is a 
better choice for non interactive bash scripts, it is also said the it has more backwards compatiblity than the latter, however for 
"regular" users might find `apt` more usefull/convenient. I will use the former, so do `apt-get update`
3. install git `sudo apt-get install git`
4. Create your repository in git-hub
5. Add an ssh key, for this we will generate a new ssh key-pair(private and public key) the public key will be added to your git account
and the private will live in your VM, we could just do just that(without further configuring ssh), if we wouldn't want to add any other 
configurations then the key-pair would be created inside the directory we executed the commands stated in [git-hub's documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
then we would add the private key to the ssh-agent and then copy and paste the public key in my git-hub registered ssh keys, that would 
be all, however as a best practice we need to be aware that there could be more than one server we want to connect to via ssh protocol,
if we don't add further configuations we would not be able to register several git-hub accounts in the same computer this would be because 
they all communicate to the same host "github.com", how would the agent know you want to push/pull/fetch from an specific account, 
mostlikely it would just perform the commands on the latest or first repository added/registered in the ssh-agent, that is why we should 
know we can/should further configure ssh following the below steps, but first be aware the SSH is a protocol that uses the Server-Client 
model, and in this guide we are talking about configuring the client only as git-hub is the server and the only thing we would need to 
do on the server side is provide it the public key which git-hub knows how to use to enable communication via SSH
	* create a `.ssh` directory with this command `mkdir ~/.ssh`, be aware that in linux you can find different directories from which 
you can configure the client, the one I just mentioned is used to configure SSH explicitly by user(user-specific keys), however if we 
would want to do the same configurations for the whole system(system-wide), we should use the directory `/etc/ssh`, these directories 
