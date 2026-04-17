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
they all communicate to the same host "github.com", how would the agent know you want to push/pull/fetch from/to an specific account, 
mostlikely it would just perform the commands on the latest or first repository added/registered to the ssh-agent, that is why we should 
know we can/should further configure ssh following the below steps, but first be aware SSH is a protocol that uses the Server-Client 
model, and in this guide we are talking about configuring the client only as git-hub is the server and the only thing we would need to 
do on the server side is provide it the public key which git-hub knows how to use to enable secure communication via SSH, this will avoid MITM attacks also
	* create a `.ssh` directory with this command `mkdir ~/.ssh`, be aware that in linux you can find different directories from which 
you can configure the client, the one I just mentioned is used to configure SSH explicitly by user(user-specific keys), however if we 
would want to do the same configurations for the whole system(system-wide), we should use the directory `/etc/ssh`, in these directories
we will store generated key-pair ssh keys(public and private keys are always generated as a pair) but also we can declare different hosts, 
which means we can have different git-hub users, they all point to the same server but each connects using its own keys, in here we will 
just configure user-specific keys and hosts, so we wil use the `.ssh` directory, be aware that it is not clear to me wheter that directory 
is created automatically or at least FYI it seems that in Windows it is not created after executing some `ssh` commands as it seems to 
be the case in Linux, so in case the directory is not created automatically you can create it manually with the command above
	* You could do this step before the previous one, as mentioned in some operating systems the directory our keys should live in 
may be created automatically, however if you do this step first and the directory is not created the keys files will be generated wherever 
directory you call this command from, call `ssh-keygen -t ed25519 -C "<your_email@someHost.com"`, you may CD into the `.ssh` directory 
before by executing `cd ~/.ssh`, some of this instructions are found in [git-hub's documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
that shows how to generate an SSh key, pay close attention to the dialog in the terminal, if you didn't CD into the `.ssh` directory
you may be able to enter the relative address like `../../.ssh/my_key_name`(this depends on where your current directory is) or you 
can enter an absolute path like `~/.ssh/my_key_name` when creating your key
	* Now we will configure the hosts(known hosts), execute `nano ~/.ssh/config` this will create the file since it should not exist
usually I would just use the configurations below, however [here](https://www.man7.org/linux/man-pages/man5/ssh_config.5.html) you can find 
all settings you can configure in the config file.
	```
	HOST juan.github.com
	HostName github.com
	PreferredAuthentications publickey
  	IdentityFile ~/.ssh/titi-jit
	AddKeysToAgent yes
  	IdentitiesOnly yes
	```
	* create a directory where your project will live in, CD into the directory and start a local repo with `git init`
	* create a remote repository in git-hub and follow its instructions
	* on your local repo run these commands `git branch -M main` to create a branch, 
`git remote add origin git@juan.github.com:Jhgomez/pretext-demo.git` see I changed the part `@github.com` to `@juan.github.com` this will
link the local and remote repo
	* Configure your user name and email with `git config --global user.email "urtiti@hotmail.com"` 
and `git config --global user.name Juan Gomez` so your commits contain your information
6. Add Github to ssh known hosts using Github's public key fingerprints which is used to validate a connection to a remote server as stated
   [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints), do `nano ~/.ssh/known_hosts`
   and copy/paste the value provided in the refenreced documentation
8. Install NVM node version manager: as usual I will rather make the installation as "manual" as possible, that means I would rather get
the executable of the tool that I need to install and then add an environment variable which points to the executable to be able to use 
it from the terminal. So in this case I searched for "NVM for linux" and found [this repo](https://github.com/nvm-sh/nvm), from here I 
followed the [Manual Install]([https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#manual-install)) instructions.
9. Once we have NVM installed we can have it install different versions of node for us, so run `nvm install 18.16.0` and 
`nvm use 18.16.0` 

# Create a `React` project
Node is a Javascript runtime, every Node version is installed with a version of the `npm` and `npx` tools. The following instructions 
were found in the [official docs](https://create-react-app.dev/docs/getting-started/)

1. `npx create-react-app my-app` `npm init react-app my-app`
2. cd into the my-app directory `cd my-app`
3. start the development server `npm start`

# Install VS COde
1. DOwnload it from their website, extract files from the `.deb` file and run `tar -xvf data.tar.xz`
2. 
